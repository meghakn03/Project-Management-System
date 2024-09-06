import React, { useState } from 'react';
import './ReportPage.css';
import folderIcon from '../assets/folder-icon.png';
import fileIcon from '../assets/file-icon.png'; // Import file icon
import downloadIcon from '../assets/download-icon.png'; // Add download icon import

const ReportPage = () => {
    const [folders, setFolders] = useState([
        { name: 'Project A', files: ['report1.pdf', 'design.png'] },
        { name: 'Project B', files: ['analysis.docx'] },
    ]);

    const [selectedFolder, setSelectedFolder] = useState(null);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFiles, setNewFiles] = useState([]);

    // Handle folder click to display files
    const openFolder = (folder) => {
        setSelectedFolder(folder);
    };

    // Close the folder
    const closeFolder = () => {
        setSelectedFolder(null);
        setNewFiles([]);
    };

    // Handle new folder creation
    const createNewFolder = () => {
        if (newFolderName) {
            setFolders([...folders, { name: newFolderName, files: [] }]);
            setNewFolderName('');
        }
    };

    // Handle file selection
    const handleFileSelection = (e) => {
        const files = Array.from(e.target.files);
        setNewFiles(files);
    };

    return (
        <div className="report-page">
            <h1>Reports and Documents</h1>

            {/* Folder creation */}
            <div className="new-folder">
                <input
                    type="text"
                    placeholder="New folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button onClick={createNewFolder}>Create Folder</button>
            </div>

            {/* Folder structure */}
            <div className="folder-structure">
                {folders.map((folder, index) => (
                    <div 
                        key={index} 
                        className="folder" 
                        onClick={() => openFolder(folder)}
                    >
                        <img src={folderIcon} alt="Folder Icon" />
                        <p>{folder.name}</p>
                    </div>
                ))}
            </div>

            {/* File display box when a folder is clicked */}
            {selectedFolder && (
                <div className="file-box">
                    <h2>{selectedFolder.name}</h2>
                    <button className="close-button" onClick={closeFolder}>Close</button>
                    <div className="file-list">
                        {selectedFolder.files.map((file, index) => (
                            <div key={index} className="file-item">
                                <img src={fileIcon} alt="File Icon" />
                                <p>{file}</p>
                                {/* Download Icon */}
                                <a href={`/${file}`} download={file}>
                                    <img src={downloadIcon} alt="Download Icon" className="download-icon"/>
                                </a>
                            </div>
                        ))}
                        {newFiles.map((file, index) => (
                            <div key={index} className="file-item">
                                <img src={fileIcon} alt="File Icon" />
                                <p>{file.name}</p>
                                {/* Download Icon */}
                                <a href={URL.createObjectURL(file)} download={file.name}>
                                    <img src={downloadIcon} alt="Download Icon" className="download-icon"/>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* File upload section */}
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleFileSelection} 
                    />
                </div>
            )}
        </div>
    );
};

export default ReportPage;
