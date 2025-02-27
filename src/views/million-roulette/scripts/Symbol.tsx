const cache: { [key: string]: HTMLImageElement } = {}

export default class Symbol {
    name: string
    img: HTMLImageElement

    constructor(name: string = Symbol.random()) {
        this.name = name

        if (cache[name]) {
            this.img = cache[name].cloneNode() as HTMLImageElement
        } else {
            this.img = new Image()
            this.img.src = new URL(`../images/cache/${name}.png`, import.meta.url).href;
            cache[name] = this.img
        }
    }

    static preload(): Promise<boolean> {
        return new Promise((resolve) => {
            const totalSymbols = Symbol.symbols.length;
            let loadedSymbols = 0;

            Symbol.symbols.forEach((symbol) => {
                const img = new Image();
                img.onload = () => {
                    loadedSymbols++;
                    if (loadedSymbols === totalSymbols) {
                        resolve(true);
                    }
                };
                img.onerror = () => {
                    loadedSymbols++;
                    if (loadedSymbols === totalSymbols) {
                        resolve(true);
                    }
                };
                img.src = new URL(`../images/car/${symbol}.png`, import.meta.url).href;
                img.setAttribute('class', 'img-style')
                if (symbol == '505' || symbol == '510') {
                    img.setAttribute('class', 'img-style-free')
                }
                cache[symbol] = img;
            });
        });
    }

    static get symbols(): string[] {
        return ['finger']
    }

    static random(): string {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)]
    }
}
