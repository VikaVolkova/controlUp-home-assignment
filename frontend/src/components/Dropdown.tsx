import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { UserRole } from "../types";

export interface DropdownProps {
  label?: string;
  multiple?: boolean;
  value: UserRole[] | UserRole | "All" | string;
  options: { id: number; name: UserRole | "All" }[];
  loading?: boolean;
  onChange: (
    event: SelectChangeEvent<UserRole[] | UserRole | "All" | string>
  ) => void;
}

export const Dropdown = ({
  label = "Select",
  multiple = true,
  value,
  options,
  loading = false,
  onChange,
}: DropdownProps) => (
  <Box sx={{ width: 300 }}>
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          if (Array.isArray(selected)) {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {options
                  .filter((opt) =>
                    (selected as UserRole[]).includes(opt.name as UserRole)
                  )
                  .map((opt) => (
                    <Box
                      key={opt.id}
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: "action.selected",
                        fontSize: 13,
                      }}
                    >
                      {opt.name}
                    </Box>
                  ))}
              </Box>
            );
          }

          const option = options.find((opt) => opt.name === selected);
          return option ? option.name : "";
        }}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} />
          </MenuItem>
        ) : (
          options.map((opt) => (
            <MenuItem key={opt.id} value={opt.name}>
              {opt.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  </Box>
);
