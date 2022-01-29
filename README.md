## Theme preview for Discord themes
#### Usage:  
Go to [https://gibbu.github.io/ThemePreview/?file=(DIRECT LINK)](https://gibbu.github.io/ThemePreview/?file)  
Paste your direct web hosted css url in place if (DIRECT LINK)

- - -

#### Direct link example:  
This will work: `https://discordstyles.github.io/Slate/Slate.theme.css`  
This will not: `https://github.com/DiscordStyles/Slate`

- - -

#### URL Paramters:  
| Parameter | Description | type |  
| :---- | :---- | :---- |
| file | Imports web hosted URL css into previewer | string \| string[] |
| lightTheme | Sets previewer to Light Theme | boolean |

`lightTheme` parameter is not required in the url if not true.  
`file` can take multiple files by separating them with a pipe (`|`).

- - -

#### End result:
```
https://gibbu.github.io/ThemePreview/?file=https://discordstyles.github.io/MinimalCord/MinimalCord.theme.css|https://discordstyles.github.io/RadialStatus/RadialStatus.theme.css&lightTheme=true
```