import { Editor, MarkdownView, Plugin, TFile } from 'obsidian'
import { DEFAULT_SETTINGS, Settings, SettingsTab } from './settings'
import { sortTodos } from './sort'

export default class MyPlugin extends Plugin {
  settings: Settings
  _debouncedSortTodos: (editor: Editor) => void

  async onload() {
    await this.loadSettings()
    this.addSettingTab(new SettingsTab(this.app, this))
    this.registerEvent(
      this.app.workspace.on('file-open', (file: TFile) => {
        if (file instanceof TFile) {
          const activeLeaf = this.app.workspace.activeLeaf
          if (activeLeaf && activeLeaf.view instanceof MarkdownView) {
            this._onEditorChange(activeLeaf.view.editor)
          }
        }
      }),
    )
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  _onEditorChange = (editor: Editor) => {
    this._sortTodos(editor)
  }

  _lastSort = new Date()
  _lastValue = ''
  _sortTodos = (editor: Editor) => {
    const began = new Date()
    const value = editor.getValue()
    if (value === this._lastValue) {
      return
    }
    if (new Date().getTime() - this._lastSort.getTime() < 100) {
      console.error('WARNING!!! Possible infinite sort detected')
      return
    }

    const result = sortTodos(value, this.settings.sortOrder)
    if (result.output !== value) {
      const now = new Date()
      console.log(`Sorted todos in ${now.getTime() - began.getTime()}ms`)
      this._lastSort = now
      this._lastValue = result.output
      editor.setValue(result.output)
    }
  }
}
