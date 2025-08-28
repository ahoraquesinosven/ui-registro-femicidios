import { Box } from "@mui/material";

type TabContentProps = {
    currentIndex: number,
    children: React.ReactElement | Iterable<React.ReadNode>,
}

export default function TabContents({ currentIndex, children }: TabContentProps) {
    const isIterable = typeof children[Symbol.iterator] === 'function';
    return (
        <>
            {Array.from(children).map((node, index) => (
                <Box sx={{display: currentIndex === index ? 'block' : 'none'}}>
                    {node}
                </Box>
            ))}
        </>
    );
}

