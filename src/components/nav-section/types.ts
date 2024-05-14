import { StackProps } from '@mui/material/Stack';
import { Theme, SxProps } from '@mui/material/styles';
import { ListItemButtonProps } from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export type SlotProps = {
  gap?: number;
  rootItem?: SxProps<Theme>;
  subItem?: SxProps<Theme>;
  subheader?: SxProps<Theme>;
  currentRole?: string;
};

export type NavItemStateProps = {
  depth?: number;
  open?: boolean;
  active?: boolean;
  externalLink?: boolean;
};

export type NavItemBaseProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
};

export type NavItemProps = ListItemButtonProps &
  NavItemStateProps &
  NavItemBaseProps & {
    slotProps?: SlotProps;
  };

export type NavListProps = {
  data: NavItemBaseProps;
  depth: number;
  slotProps?: SlotProps;
};

export type NavGroupProps = {
  items: NavItemBaseProps[];
  slotProps?: SlotProps;
};

export type NavProps = StackProps & {
  data: {
    items: NavItemBaseProps[];
  }[];
  slotProps?: SlotProps;
};
