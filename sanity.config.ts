import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";

const config = defineConfig({
    projectId: "z7wo4x52",
    dataset:"production",

    title: "Blog Test",

    apiVersion: "2025-02-10",

    basePath: "/admin",

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemas
    }
});


export default config;