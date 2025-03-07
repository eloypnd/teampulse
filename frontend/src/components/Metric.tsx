import { Box, Stat } from "@chakra-ui/react";
import { InfoTip } from "./ui/toggle-tip";

type MetricProps = {
  label: string;
  helperText: string;
  value: number | string;
  unit: string;
};

const Metric = (props:MetricProps) => {
  return (
      <Box maxW="sm" borderWidth="1px" padding="4" margin="4 0" color="fg.muted">
        <Stat.Root>
          <Stat.Label>
            {props.label}
            <InfoTip>{props.helperText}</InfoTip>
          </Stat.Label>
          <Stat.ValueText alignItems="baseline">
            {props.value} <Stat.ValueUnit>{props.unit}</Stat.ValueUnit>
          </Stat.ValueText>
          {/* <Stat.HelpText>{props.helperText}</Stat.HelpText> */}
        </Stat.Root>
      </Box>
  );
};

export default Metric;
