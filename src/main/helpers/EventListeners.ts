import { ipcMain, BrowserWindow, dialog } from 'electron';
import { writeFile, readFile } from 'fs/promises';
import { basename } from 'path';

export default class EventListeners {
    constructor() {
        this.saveFile();
        this.openFile();
    }

    /**
     * Saves a file by listening to the 'saveFile' event.
     */
    private saveFile() {
        ipcMain.on('saveFile', async (event, contents) => {
            const CurrentBrowserWindow = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowserWindow) return;

            const DialogOptions = {
                title: 'Exporting a File',
                filters: [{ name: 'spark', extensions: ['ss'] }],
            };
            const Result = await dialog.showSaveDialog(CurrentBrowserWindow, DialogOptions);
            if (Result.canceled) return;
            if (!Result.filePath) return;
            await writeFile(Result.filePath, contents);

            CurrentBrowserWindow.webContents.send(
                'fileSavedSuccessfully',
                Result.filePath,
                basename(Result.filePath),
            );
        });
    }

    private openFile() {
        ipcMain.on('openFile', async (event) => {
            const CurrentBrowser = BrowserWindow.fromWebContents(event.sender);
            if (!CurrentBrowser) return;

            const DialogOptions = {
                title: 'Importing a File',
                filters: [{ name: 'spark', extensions: ['ss'] }],
            };
            const Result = await dialog.showOpenDialog(CurrentBrowser, DialogOptions);
            if (Result.canceled) return;
            if (!Result.filePaths) return;

            const File = await readFile(Result.filePaths[0], { encoding: 'utf-8' });
            CurrentBrowser.webContents.send(
                'filedOpened',
                File,
                Result.filePaths,
                basename(Result.filePaths[0]),
            );
        });
    }
}