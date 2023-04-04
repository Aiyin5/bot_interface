
export const read_block = async (block_id,token, num_tabs = 0) =>{
    const BLOCK_CHILD_URL_TMPL = "/notion/blocks/{block_id}/children"
    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
    }
    let done = false;
    const result_lines_arr = [];
    let cur_block_id = block_id;

    while (!done) {
        const block_url = BLOCK_CHILD_URL_TMPL.replace("{block_id}", cur_block_id);
        const query_dict = {};

        const res = await fetch(block_url, {
            method: "GET",
            headers: headers
            //body: JSON.stringify(query_dict)
        });

        const data = await res.json();

        for (const result of data.results) {
            const result_type = result.type;
            const result_obj = result[result_type];

            const cur_result_text_arr = [];

            if ("rich_text" in result_obj) {
                for (const rich_text of result_obj.rich_text) {
                    if ("text" in rich_text) {
                        const text = rich_text.text.content;
                        const prefix = "\t".repeat(num_tabs);
                        cur_result_text_arr.push(prefix + text);
                    }
                }
            }

            const result_block_id = result.id;
            const has_children = result.has_children;

            if (has_children) {
                console.log("start next")
                const children_text = await _read_block(result_block_id, num_tabs + 1);
                cur_result_text_arr.push(children_text);
            }

            const cur_result_text = cur_result_text_arr.join("\n");
            result_lines_arr.push(cur_result_text);
        }

        if (data.next_cursor === null) {
            done = true;
            break;
        } else {
            cur_block_id = data.next_cursor;
        }
    }
    const result_lines = result_lines_arr.join("\n");
    return result_lines;
}

function getHashCode(str) {
    let hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export const getHashFromArticle = async (article)=>{
    let articleBytes = new TextEncoder().encode(article);
// 使用SHA-256算法计算哈希值
    let hash=await crypto.subtle.digest("SHA-256", articleBytes);
    let hashString = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    return hashString;
}