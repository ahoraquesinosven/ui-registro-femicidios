import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import { BoxProps } from "@mui/material";

export type TabbedSectionsProps = {
  initialTab?: number,

  sections: {
    key: string,
    label: string,
    component: React.ReactNode,
  }[],

  tabProps?: TabsProps,

  boxProps?: BoxProps,
};

export default function TabbedSections(props: TabbedSectionsProps) {
  const [currentTab, setCurrentTab] = useState(props.initialTab || 0);

  const handleChangeCurrentTab = (_event: unknown, newTab: number) => {
    setCurrentTab(newTab);
  }

  return (
    <>
      <Tabs {...props.tabProps} value={currentTab} onChange={handleChangeCurrentTab}>
        {props.sections.map((section) => (
          <Tab key={`${section.key}-tab`} label={section.label} />
        ))}
      </Tabs>

      {props.sections.map((section, index) => (
        <Box
          {...props.boxProps}
          key={`${section.key}-box`} 
          sx={{
            ...props.boxProps?.sx,
            display: index === currentTab ? "block" : "none",
          }}
          children={section.component} />
      ))}
    </>

  );
}
