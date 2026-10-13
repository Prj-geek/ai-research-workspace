import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

/** Run the package's JavaScript CLI directly, including on Windows and paths with spaces. */
export function spawnPackageCli(name, args, options) {
  const packageDir = path.join(options.cwd, "node_modules", name);
  const manifest = JSON.parse(readFileSync(path.join(packageDir, "package.json"), "utf8"));
  const entry = typeof manifest.bin === "string" ? manifest.bin : manifest.bin?.[name];
  if (!entry) throw new Error(`No CLI entry found for ${name}. Run pnpm install --frozen-lockfile.`);
  return spawn(process.execPath, [path.resolve(packageDir, entry), ...args], {
    ...options,
    windowsHide: true,
  });
}

/** Terminate child process trees so Windows does not leave occupied server ports. */
export function stopLocalProcess(child) {
  if (!child.pid || child.exitCode !== null) return;
  if (process.platform === "win32") {
    const killer = spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      windowsHide: true,
      stdio: "ignore",
    });
    killer.once("error", () => child.kill());
    killer.once("exit", (code) => {
      if (code !== 0 && child.exitCode === null) child.kill();
    });
  } else {
    child.kill("SIGTERM");
  }
}
