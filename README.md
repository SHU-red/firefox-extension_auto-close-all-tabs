# Auto Close All Tabs

A simple Firefox extension that automatically closes all tabs after a specified period of inactivity, leaving a single blank tab. This is particularly useful in environments like Docker containers to reduce resource usage after a period of inactivity.

## How it Works

This extension monitors browser activity by listening for tab and window events, such as tab activation, updates, and window focus changes. If no such activity is detected within the user-defined timeout period, the extension will close all open tabs and create a new, blank tab (`about:blank`) to keep the browser window open.

The remaining time until the tabs are closed is displayed as a badge on the extension's icon.

## Installation

### From Mozilla Add-ons (Coming Soon!)

Once approved, you will be able to install this extension directly from the Mozilla Add-on store.

### Manual Installation (for development)

1.  Clone this repository or download the source code as a ZIP file.
2.  Open Firefox and navigate to `about:debugging`.
3.  Click on "This Firefox" in the sidebar.
4.  Click on "Load Temporary Add-on...".
5.  Select the `manifest.json` file from the project directory.

## Usage

1.  After installation, the extension will start with a default timeout of 600 seconds (10 minutes).
2.  To change the timeout, right-click the extension icon in the toolbar and select "Options".
3.  Enter the desired inactivity timeout in seconds (minimum 15 seconds).
4.  Click "Save".

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or find a bug, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.