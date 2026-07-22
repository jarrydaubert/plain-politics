import {
  canonicalPoliticalDataPaths,
  loadCanonicalPoliticalData,
  parseCanonicalPoliticalDataFiles
} from "@/political-data/storage";
import { validatePoliticalData, validatePoliticalDataHistory } from "@/political-data/validate";

const data = loadCanonicalPoliticalData();
const result = validatePoliticalData(data);
if (process.env.CI && !process.env.POLITICAL_DATA_BASE_REF) {
  throw new Error("CI must provide the verified GitHub base SHA in POLITICAL_DATA_BASE_REF");
}
const baselineRef = process.env.POLITICAL_DATA_BASE_REF ?? "origin/main";
const canonicalRootPath = canonicalPoliticalDataPaths[0];
const gitWorktree = Bun.spawnSync(["git", "rev-parse", "--is-inside-work-tree"]);
let historyStatus = "local copy has no Git worktree; history baseline skipped";

if (gitWorktree.exitCode === 0) {
  const baselineCommit = Bun.spawnSync(["git", "rev-parse", "--verify", `${baselineRef}^{commit}`]);
  if (baselineCommit.exitCode !== 0) {
    throw new Error(`Political data baseline ref is unavailable: ${baselineRef}`);
  }

  const baselineTree = Bun.spawnSync([
    "git",
    "ls-tree",
    "--name-only",
    baselineRef,
    "--",
    canonicalRootPath
  ]);
  if (baselineTree.exitCode !== 0) {
    throw new Error(`Political data baseline tree could not be read from ${baselineRef}`);
  }

  if (baselineTree.stdout.toString().trim() === canonicalRootPath) {
    const baselineFiles = canonicalPoliticalDataPaths.map((path) => {
      const baselineFile = Bun.spawnSync(["git", "show", `${baselineRef}:${path}`]);
      if (baselineFile.exitCode !== 0) {
        throw new Error(`Political data baseline file could not be read: ${baselineRef}:${path}`);
      }

      try {
        return JSON.parse(baselineFile.stdout.toString());
      } catch {
        throw new Error(`Political data baseline file is not valid JSON: ${baselineRef}:${path}`);
      }
    });

    validatePoliticalDataHistory(parseCanonicalPoliticalDataFiles(baselineFiles), data);
    historyStatus = `canonical history checked against ${baselineRef}`;
  } else {
    historyStatus = `initial dataset; ${canonicalRootPath} is absent from ${baselineRef}`;
  }
} else if (process.env.CI || process.env.POLITICAL_DATA_BASE_REF) {
  throw new Error("Political data history validation requires a Git worktree");
}

console.log(
  `Canonical political data valid: ${result.parties} parties, ${result.assignments} assignments, ${result.snapshots} snapshots, ${result.evidenceReferences} reviewed evidence references; ${historyStatus}.`
);
