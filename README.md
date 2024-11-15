# Todos Sort Plugin

_A plugin for [Obsidian](https://obsidian.md) that sorts todos by completion status within a note._

**Ever wanted to sort your todos by completion status when you open a note? Well, this Obsidian plugin is here to help you! This plugin automatically sorts todos in your notes based on their completion status, making it easier to manage and prioritise your tasks (only on file open - not for every single note edit)**

![demo](https://github.com/jsifalda/obsidian-todos-sort/raw/refs/heads/main/obsidian-todos-sorter.mov)

## Features

- **Automatic Sorting**: Automatically sorts todos in your notes whenever a file is opened.
- **Customizable Sort Order**: Choose whether completed tasks appear at the top or bottom of your list.
- **Efficient Performance**: Optimized to handle large notes with minimal performance impact.
- **User-Friendly Settings**: Easily configure the plugin settings through the Obsidian settings tab.

## Installation

1. Download the latest release from the [GitHub Releases](https://github.com/jsifalda/obsidian-todos-sort/releases) page.
2. Extract the contents of the zip file into your Obsidian plugins folder.
3. Enable the plugin in the Obsidian settings under the "Community Plugins" section.

## Usage

Once installed and enabled, the plugin will automatically sort todos in your notes based on the selected sort order. You can configure the sort order in the plugin settings:

1. Open the Obsidian settings.
2. Navigate to the "Todos Sort" tab.
3. Choose your preferred sort order:
   - **Completed at top**: Completed tasks will appear at the top of the list.
   - **Completed at bottom**: Completed tasks will appear at the bottom of the list.

## Development

To contribute to the development of this plugin, follow these steps:

1. Clone the repository: `git clone https://github.com/jsifalda/obsidian-todos-sort.git`
2. Install dependencies: `yarn install`
3. Build the plugin: `yarn run build`
4. Test your changes: `yarn run test`

## Release Process

To release a new version of the plugin:

1. Make and commit your changes.
2. Tag the release: `git tag x.x.x`
3. Push the tags: `git push origin --tags`

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Developed by [@jsifalda](https://dub.sh/I5tFaqk) (forked version of [Ryan Gomba](https://github.com/ryangomba/obsidian-todo-sort))
- Inspired by the need for better task management within Obsidian notes.

For more information, visit the [GitHub repository](https://github.com/jsifalda/obsidian-todos-sort).
