import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { downloadTool, extractZip } from '@actions/tool-cache'

export async function run(): Promise<void> {
  try {
    const cocosUrl = core.getInput('cocos_url')
    const projectPath = core.getInput('project_path')
    const buildConf = core.getInput('build_conf')

    const ccZipPath = await downloadTool(cocosUrl, `CocosCreator.zip`)
    await extractZip(`${ccZipPath}`, './')
    await exec(`open ./CocosCreator.app`)
    let code = -1
    try {
      code = await exec(
        `./CocosCreator.app/Contents/MacOS/CocosCreator --project ${projectPath} --build "configPath=${buildConf};"`
      )

      core.debug(`====0011 ${code}===`)
    } catch (e) {
      core.debug(`====0022 ${code}===`)
      core.debug(`====11111 ${(e as Error).message}===`)
      core.debug(`====22222 =${(e as Error).name}==`)
      core.debug(`====33333 =${(e as Error).stack}==`)
      core.debug(`====44444 =${(e as Error).cause}==`)
    }

    core.debug(`====0033 ${code}===`)

    core.debug(`====Cocos build ok ===`)

    //core.debug(`Waiting ${ms} milliseconds ...`)
    //core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
