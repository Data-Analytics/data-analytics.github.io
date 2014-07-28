(function() {
    d3.csv = function(url, callback) {
        d3.text(url, "text/csv", function(text) {
            callback(text && d3.csv.parse(text));
        });
    };
    d3.csv.parse = function(text) {
        var header;
        return d3.csv.parseRows(text, function(row, i) {
            if (i) {
                var o = {},
                    j = -1,
                    m = header.length;
                while (++j < m) o[header[j]] = row[j];
                return o;
            } else {
                header = row;
                return null;
            }
        });
    };
    d3.csv.parseRows = function(text, f) {
        var EOL = {},
            EOF = {},
            rows = [],
            re = /\r\n|[,\r\n]/g,
            n = 0,
            t, eol;
        re.lastIndex = 0;

        function token() {
            if (re.lastIndex >= text.length) return EOF;
            if (eol) {
                eol = false;
                return EOL;
            }
            var j = re.lastIndex;
            if (text.charCodeAt(j) === 34) {
                var i = j;
                while (i++ < text.length) {
                    if (text.charCodeAt(i) === 34) {
                        if (text.charCodeAt(i + 1) !== 34) break;
                        i++;
                    }
                }
                re.lastIndex = i + 2;
                var c = text.charCodeAt(i + 1);
                if (c === 13) {
                    eol = true;
                    if (text.charCodeAt(i + 2) === 10) re.lastIndex++;
                } else if (c === 10) {
                    eol = true;
                }
                return text.substring(j + 1, i).replace(/""/g, "\"");
            }
            var m = re.exec(text);
            if (m) {
                eol = m[0].charCodeAt(0) !== 44;
                return text.substring(j, m.index);
            }
            re.lastIndex = text.length;
            return text.substring(j);
        }
        while ((t = token()) !== EOF) {
            var a = [];
            while ((t !== EOL) && (t !== EOF)) {
                a.push(t);
                t = token();
            }
            if (f && !(a = f(a, n++))) continue;
            rows.push(a);
        }
        return rows;
    };
    d3.csv.format = function(rows) {
        return rows.map(d3_csv_formatRow).join("\n");
    };

    function d3_csv_formatRow(row) {
        return row.map(d3_csv_formatValue).join(",");
    }

    function d3_csv_formatValue(text) {
        return /[",\n]/.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
    }
})();