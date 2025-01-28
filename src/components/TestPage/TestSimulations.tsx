//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DynamicButton from "../DynamicButton";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../DrawerMenu";


const TestSimulations = () => {
    const [message, setMessage] = useState(""); // Success or error message
    const [isLoading, setIsLoading] = useState(false); // Manage loading state for clearing files
    const [isLoadingExe, setIsLoadingExe] = useState(false); // Manage loading state for EXE simulation
    const [files, setFiles] = useState([]); // List of matching files
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Fetch matching files on component mount
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const matchingFiles = await window.electronAPI.getMatchingFiles();
                setFiles(matchingFiles);
            } catch (error) {
                console.error("Error fetching files:", error);
                setMessage("Failed to fetch files. Check the console for details.");
            }
        };

        fetchFiles();
    }, []);

    const handleRunSimulationExe = async () => {
        setMessage("");
        setIsLoadingExe(true);
        try {
            const result = await (window as any).electronAPI.runSimulationExe(); // Run EXE simulation
            console.log("EXE Simulation Result:", result);
            setMessage("EXE Simulation completed successfully.");
        } catch (error) {
            console.error("Error running EXE Simulation:", error);
            setMessage("Failed to run EXE Simulation. Check the console for details.");
        } finally {
            setIsLoadingExe(false);
        }
    };

    const handleClearSimOutputFiles = async () => {
        setMessage("");
        setIsLoading(true);
        try {
            await window.electronAPI.clearSimOutputFiles();
            setMessage("simOutputFiles directory cleared successfully.");
        } catch (err) {
            console.error(err);
            setMessage("Failed to clear simOutputFiles directory.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle file parsing and logging
    const cleanAndParseJSON = (jsonString: string) => {
        try {
            // Remove trailing commas before brackets
            const cleanedJson = jsonString
                .replace(/,\s*}/g, '}') // Remove trailing commas before }
                .replace(/,\s*]/g, ']'); // Remove trailing commas before ]

            // Attempt to parse cleaned JSON
            return JSON.parse(cleanedJson);
        } catch (error) {
            console.error("Failed to parse cleaned JSON:", error);
            throw new Error("JSON is malformed and could not be repaired.");
        }
    };

    // Example usage in your handleParseFile function:
    const handleParseFile = async (fileName: string) => {
        try {
            const fileContents = await window.electronAPI.readFile(fileName);

            if (fileName.endsWith('.json')) {
                try {
                    const jsonData = JSON.parse(fileContents);
                    console.log(`Parsed JSON Data for ${fileName}:`, jsonData);
                } catch {
                    console.warn(`Malformed JSON detected in ${fileName}. Attempting repair...`);
                    const repairedJson = cleanAndParseJSON(fileContents);
                    console.log(`Repaired and parsed JSON Data for ${fileName}:`, repairedJson);
                }
            }
        } catch (error) {
            console.error(`Error reading file ${fileName}:`, error);
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
            
        }}>
            <DrawerMenu />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                
            }}>
            <Typography variant="h5">{t("testSimulations")}</Typography>
            <DynamicButton
                label={isLoadingExe ? "Running EXE Simulation..." : "Run EXE Simulation"}
                onClick={handleRunSimulationExe}
                isLoading={isLoadingExe}
                color="secondary"
                sx={{ marginBottom: "10px" }}
            />
            <DynamicButton
                label={isLoading ? "Clearing Directory..." : "Clear simOutputFiles Directory"}
                onClick={handleClearSimOutputFiles}
                isLoading={isLoading}
                color="secondary"
                sx={{ marginBottom: "10px" }}
            />
            </Box>
            <div style={{
                padding: "20px",
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                {files.length > 0 && (
                    <Box sx={{ marginTop: 4,
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                     }}>
                        <Typography sx={{
                            width: "100%",
                            textAlign: "left",
                        }} variant="h5">{t("matchingFiles")}</Typography>
                        {files.map((file, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                color="primary"
                                onClick={() => handleParseFile(file)}
                                sx={{marginBottom: "10px",}}
                            >
                                {file}
                            </Button>
                        ))}
                    </Box>
                )}
                {isLoadingExe && (
                    <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
                        Please wait, simulation is running...
                    </p>
                )}
                {message && (
                    <p style={{ marginTop: "10px", color: message.includes("Failed") ? "red" : "green" }}>
                        {message}
                    </p>
                )}
            </div>
        </Box>
    )
}

export default TestSimulations