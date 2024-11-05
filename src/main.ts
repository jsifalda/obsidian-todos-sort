import { Editor, MarkdownView, Plugin, TFile } from 'obsidian'
import { DEFAULT_SETTINGS, TodoSorterSettings, TodoSorterSettingsTab } from './settings'
import { sortTodos } from './sort'

export default class TodoSorterPlugin extends Plugin {
  settings: TodoSorterSettings
  _debouncedSortTodos: (editor: Editor) => void

  async onload() {
    await this.loadSettings()
    this.addSettingTab(new TodoSorterSettingsTab(this.app, this))
    this.registerEvent(
      this.app.workspace.on('file-open', (file: TFile) => {
        if (file instanceof TFile) {
          const view = this.app.workspace.getActiveViewOfType(MarkdownView)
          if (view && view instanceof MarkdownView) {
            this._onEditorChange(view.editor)
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
    const cursor = editor.getCursor()
    const lineNumber = cursor.line
    const result = sortTodos(value, this.settings.sortOrder)
    if (result.output !== value) {
      const now = new Date()
      this._lastSort = now
      this._lastValue = result.output
      editor.setValue(result.output)
      const newLine = result.lineMap[lineNumber]
      editor.setCursor({
        line: newLine,
        ch: cursor.ch,
      })
    }
  }
}
