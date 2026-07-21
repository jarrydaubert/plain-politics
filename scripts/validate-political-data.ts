import { loadCanonicalPoliticalData } from "@/political-data/storage";
import { validatePoliticalData, validatePoliticalDataHistory } from "@/political-data/validate";

const data = loadCanonicalPoliticalData();
const result = validatePoliticalData(data);
const baselineRef = process.env.POLITICAL_DATA_BASE_REF ?? "origin/main";
const canonicalPath = "src/political-data/canonical-data.json";
const gitWorktree = Bun.spawnSync(["git", "rev-parse", "--is-inside-work-tree"]);
let historyStatus = "local copy has no Git worktree; history baseline skipped";

if (gitWorktree.exitCode === 0) {
  const baselineCommit = Bun.spawnSync(["git", "rev-parse", "--verify", `${baselineRef}^{commit}`]);
  if (baselineCommit.exitCode !== 0) {
    throw new Error(`Political data baseline ref is unavailable: ${baselineRef}`);
  }

  const baseline = Bun.spawnSync(["git", "show", `${baselineRef}:${canonicalPath}`]);
  if (baseline.exitCode === 0) {
    validatePoliticalDataHistory(JSON.parse(baseline.stdout.toString()), data);
    historyStatus = `append-only history checked against ${baselineRef}`;
  } else {
    const baselinePath = Bun.spawnSync([
      "git",
      "cat-file",
      "-e",
      `${baselineRef}:${canonicalPath}`
    ]);
    if (baselinePath.exitCode === 0) {
      throw new Error(`Political data baseline could not be read from ${baselineRef}`);
    }
    historyStatus = `initial dataset; ${canonicalPath} is absent from ${baselineRef}`;
  }
} else if (process.env.CI || process.env.POLITICAL_DATA_BASE_REF) {
  throw new Error("Political data history validation requires a Git worktree");
}

console.log(
  `Canonical political data valid: ${result.parties} parties, ${result.assignments} assignments, ${result.snapshots} snapshots, ${result.evidenceReferences} reviewed evidence references; ${historyStatus}.`
);
