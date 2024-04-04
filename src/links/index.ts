import fs from 'fs';
import { FILES, URLS } from '../common/constants';
import _ from 'lodash';

export async function parseRadarSitemap(): Promise<string[]> {
    const sitemap = await (await fetch(URLS.SITEMAP)).text();

    const regex = /<loc>(.*?)<\/loc>/g;
    const links: string[] = [];
    let match;

    while ((match = regex.exec(sitemap)) !== null) {
        links.push(match[1]);
    }

    links.sort();

    const uniqueLinks = _.uniq(links);
    fs.writeFileSync(FILES.DATA.LINKS, JSON.stringify(uniqueLinks, null, 4));

    console.log(`Found ${uniqueLinks.length} unique radar blip page links`);

    return uniqueLinks;
}