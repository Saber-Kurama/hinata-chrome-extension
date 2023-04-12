<script>
  // https://digit-force.coding.net/dashboard

  import axios from "axios";
  import { Octokit } from "@octokit/rest";

  const octokit = new Octokit({
    auth: "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",
  });
  // 'origin': 'https://arco.design',
  const handleClick = async () => {
    const data1 = axios.post(
      "https://api.github.com/repos/Saber-Kurama/digitforce-icons/actions/workflows/26619192/dispatches",
      // {
      //   Action: "TriggerCodingCIBuild",
      //   JobId: 1463645,
      //   Revision: "master",
      // },
      {
        ref: "main",
      },
      {
        headers: {
          authorization: "token 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",
          accept: "application/vnd.github.v3+json",
          origin: "https://arco.design",
        },
        // withCredentials: true
      }
    );
    const data = await octokit.request(
      "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
      {
        owner: "Saber-Kurama",
        repo: "digitforce-icons",
        workflow_id: "26619192",
        ref: "main",
      }
    );
  };
</script>

<div class="arco-space-item" on:click={handleClick} style="margin-left: 8px;">
  <button
    class="arco-btn arco-btn-primary arco-btn-status-success arco-btn-size-default arco-btn-shape-square"
    type="button"
    ><svg
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      class="arco-icon arco-icon-export"
      ><path
        d="M31.928 33.072 41 24.002l-9.072-9.072M16.858 24h24M31 41H7V7h24"
      /></svg
    ><span>发布 VUE NPM</span></button
  >
</div>

<style>
</style>
