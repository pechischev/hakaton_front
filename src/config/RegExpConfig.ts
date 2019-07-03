// noinspection RegExpRedundantEscape
export const RegExpConfig = {
    EMPTY: /[""]/g,
    SPECIAL_SYMBOLS: /[\s\^\$\*\+\?\{\[\]\\\/\|\(\)\}]/g,
    SPECIAL_SYMBOLS_WITHOUT_SPACE: /[\^\$\*\+\?\{\[\]\\\/\|\(\)\}]/g,
    SPECIAL_SYMBOLS_FOR_DESCRIPTION: /[\^\$\?\{\[\]\\\/\|\}]/g,
    SPECIAL_SYMBOLS_FOR_USERNAME: /[\s\^\$\*\+\?\{\[\]\\\/\|\(\)\}\!\@\;\:\~\`\'\"\,\.\<\>\%\№\#]/g,
    ONLY_NUMBER: /[\D]/g,
    ONLY_DECIMAL: /^(?!(^[0-9]*(?:[\.\,][0-9]*)?$))/,
};
