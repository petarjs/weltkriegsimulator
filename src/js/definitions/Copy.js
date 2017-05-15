/**
 * The MIT License (MIT)
 *
 * Igor Zinken 2017 - http://www.igorski.nl
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
"use strict";

const Copy = module.exports = {

    /**
     * copy can be either string, Array.<string> or an Object
     * w/ separate "title" and "body" string (for
     * instance for displaying messages w/ title header)
     */
    BONUS  : `{0} pts. awarded`,
    ENERGY : `Energy restored`,
    WEAPONS: [ `Bullet`, `Bullet spray`, `Laser` ],
    WEAPON : `Equipped {0}`,

    MUSIC: {
        title: `Now playing:`,
        body : `{0} by {1}`
    },

    /**
     * @public
     * @param {string} copyKey of above enumeration
     * @param {string|Array.<string>=} optDataReplacement with values to replace in above strings,
     *        either single string for single {0} replacement, or Array.<string> for {0}, {1}, {2}, etc..
     * @return {string}
     */
    applyData( copyKey, optDataReplacement ) {

        const text = Copy[ copyKey ], isPrimitive = typeof text === "string";

        // create a deep copy of primitive values

        let data = ( isPrimitive ) ? text : text.title;

        if ( Array.isArray( optDataReplacement )) {
            optDataReplacement.forEach(( replacement, index ) => {
                data = data.replace( `{${index}}`, replacement );
            });
        }
        else if ( typeof optDataReplacement === "string" || typeof optDataReplacement === "number" ) {
            data = data.replace( `{0}`, optDataReplacement );
        }
        return {
            title: data,
            body : ( !isPrimitive ) ? text.body : null
        };
    }
};
