export const tagsDictionary: { [key: string]: string } = Object.freeze({
    'rating:safe': 'safe',
    'rating:questionableless': 'ecchi+safe',
    'rating:questionable': 'ecchi',
    'rating:questionableplus': 'ecchi+hentai',
    'rating:explicit': 'hentai',
    'width:2560..': 'width>=2560',
    'width:2560': 'width==2560',
    'width:2560.': 'width<2560',
    'height:1440..': 'height>=1440',
    'height:1440': 'height==1440',
    'height:1440.': 'height<=1440',
});

export const getTagsName = (tag: string): string => tagsDictionary[tag] || tag;
