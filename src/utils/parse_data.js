// To parse this data:
//
//   const Convert = require("./file");
//
//   const espSoc = Convert.toEspSoc(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toEspSoc(json) {
    if(typeof(json) == 'object')
        json = JSON.stringify(json)
    
    return cast(JSON.parse(json), r("EspSoc"));
}

function espSocToJson(value) {
    return JSON.stringify(uncast(value, r("EspSoc")), null, 2);
}

function invalidValue(typ, val, key = '') {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val, typ, getProps, key = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}

function a(typ) {
    return { arrayItems: typ };
}

function u(...typs) {
    return { unionMembers: typs };
}

function o(props, additional) {
    return { props, additional };
}

function m(additional) {
    return { props: [], additional };
}

function r(name) {
    return { ref: name };
}

const typeMap = {
    "EspSoc": o([
        { json: "ap_pass", js: "ap_pass", typ: "" },
        { json: "ap_ssid", js: "ap_ssid", typ: "" },
        { json: "connection_mode", js: "connection_mode", typ: "" },
        { json: "gpios", js: "gpios", typ: u(undefined, a(r("Gpio"))) },
        { json: "ip_config", js: "ip_config", typ: u(undefined, r("IPConfig")) },
        { json: "mac", js: "mac", typ: "" },
        { json: "sta_pass", js: "sta_pass", typ: "" },
        { json: "sta_ssid", js: "sta_ssid", typ: "" },
        { json: "used_gpios", js: "used_gpios", typ: u(undefined, a(r("UsedGpio"))) },
    ], "any"),
    "Gpio": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "pin_number", js: "pin_number", typ: u(undefined, u(3.14, "")) },
        { json: "used", js: "used", typ: u(undefined, true) },
    ], "any"),
    "IPConfig": o([
        { json: "gateway_address", js: "gateway_address", typ: "" },
        { json: "ip_address", js: "ip_address", typ: "" },
        { json: "mode", js: "mode", typ: "" },
        { json: "subred_mask_address", js: "subred_mask_address", typ: "" },
    ], "any"),
    "UsedGpio": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "mode", js: "mode", typ: u(undefined, "") },
        { json: "pin_number", js: "pin_number", typ: u(undefined, u(3.14, "")) },
        { json: "value", js: "value", typ: u(undefined, u(true, 3.14, "")) },
    ], "any"),
};


export const Convert = {espSocToJson, toEspSoc};
