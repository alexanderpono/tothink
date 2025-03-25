import React from 'react';
import parse from 'html-react-parser';

export interface ShowSourceProps {
    text: string;
}

export const ShowSource: React.FC<ShowSourceProps> = ({ text }) => {
    return <pre className="program">{formatCode(text)}</pre>;
};

const keyToTag = {
    ['export']: '@e',
    ['const']: '@c',
    ['import']: '@i',
    ['from']: '@f',
    ['return']: '@r',
    ['interface']: '@I',
    ['number']: '@n',
    ['let']: '@l',
    ['for']: '@F'
};
const keywords = [
    'export',
    'const',
    'import',
    'from',
    'return',
    'interface',
    'number',
    'let',
    'for'
];
const tagToEl = {
    ['e']: parse(`<span class="keyword">export</span>`),
    ['c']: parse(`<span class="keyword">const</span>`),
    ['i']: parse(`<span class="keyword">import</span>`),
    ['f']: parse(`<span class="keyword">from</span>`),
    ['r']: parse(`<span class="keyword">return</span>`),
    ['I']: parse(`<span class="keyword">interface</span>`),
    ['n']: parse(`<span class="keyword">number</span>`),
    ['l']: parse(`<span class="keyword">let</span>`),
    ['F']: parse(`<span class="keyword">for</span>`)
};

const formatCode = (srcText: string) => {
    let text = srcText;
    keywords.forEach((keyword: string) => {
        text = text.replace(new RegExp(keyword, 'g'), keyToTag[keyword]);
    });
    const lines = text.split('@');
    const lines2 = [];
    lines.forEach((line: string, index: number) => {
        if (index === 0) {
            lines2.push(line);
            return;
        }
        const letter = line[0];
        const el = tagToEl[letter];
        if (typeof el !== 'undefined') {
            lines2.push(el);
            lines2.push(line.substring(1));
            return;
        }
    });
    return lines2.map((el, index) => <span key={index}>{el}</span>);
};
