export class FoliaAPI {
    static GET_PROJECTS_URL: Function = (name: string): string => { return `https://api.papermc.io/v2/projects/${name}` };
    static GET_BUILDS_URL: Function = (name: string, version: string): string => { return `https://api.papermc.io/v2/projects/${name}/versions/${version}/builds` };

    static async getProjects(name = "paper", version = null, limit = null): Promise<string[]> {
        try {
            const response = await fetch(this.GET_PROJECTS_URL(name));
            const data: any = await response.json() ?? {};

            if (!data.versions?.length) {
                return [];
            }

            const filtered = version
                ? [data.versions.find(v => v === version)]
                : data.versions;

            const sliced = !version && limit > 0
                ? filtered.slice(-limit)
                : filtered;

            return sliced;

        } catch (error) {
            console.error(error);
        }

        return [];
    }

    static async getBuilds(name = "paper", version = "0.0.0"): Promise<any> {
        try {
            const response = await fetch(this.GET_BUILDS_URL(name, version));
            const data: any = await response.json() ?? {};

            return data.builds ?? [];
        } catch (error) {
            console.error(error);
        }

        return [];
    }

    static generateDownloadLink(name, version, build, filename) {
        return `https://api.papermc.io/v2/projects/${name}/versions/${version}/builds/${build}/downloads/${name}-${version}-${build}.jar`;
    }
}
