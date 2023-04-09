import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import remarkGfm from "remark-gfm"

export default function MarkdownSupport()
{
    return (<ReactMarkdown remarkPlugins={[remarkGfm]}>
        ## Test
    </ReactMarkdown>)
}