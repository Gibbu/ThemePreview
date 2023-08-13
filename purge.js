import { PurgeCSS } from 'purgecss';
import { unlinkSync, writeFileSync } from 'fs';

const purgeResult = await new PurgeCSS().purge({
	content: ['./index.html'],
	css: ['./discord.css']
});

writeFileSync('./styles.css', purgeResult[0].css);
unlinkSync('./discord.css');
