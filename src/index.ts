import { FoliaAPI } from "./FoliaAPI";

// Must be defined, represent the project name to get infos about.
const name: string = "folia";

// If defined will only return the 'X' latest versions infos.
const maxVersionsCount: number = 4;

// If defined will only return the specified versions infos.
const version: string = "1.20.6";

async function main() {
    const versionsBuilds = {};
    const versions = await FoliaAPI.getProjects(name, version, maxVersionsCount);

    for (let i = 0; i < versions.length; i++) {
        const version = versions[i];
        const builds = await FoliaAPI.getBuilds(name, version);
        versionsBuilds[`----------| ${version} |----------`] = "----------------------------------------------------------------------------------------------"

        for (let j = 0; j < builds.length; j++) {
            const buildData = builds[j];
            const buildNumber = buildData.build;
            const filename = buildData.downloads.application.name;

            versionsBuilds[`${filename}`] = FoliaAPI.generateDownloadLink(name, version, buildNumber, filename);
        }
    }

    console.table(versionsBuilds);
}


main();