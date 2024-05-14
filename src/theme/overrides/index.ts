import merge from 'lodash/merge';

import { Theme } from '@mui/material/styles';

import { tabs } from './components/tabs';
import { menu } from './components/menu';
import { list } from './components/list';
import { table } from './components/table';
import { alert } from './components/alert';
import { badge } from './components/badge';
import { paper } from './components/paper';
import { appBar } from './components/appbar';
import { dialog } from './components/dialog';
import { avatar } from './components/avatar';
import { button } from './components/button';
import { defaultProps } from './default-props';
import { tooltip } from './components/tooltip';
import { popover } from './components/popover';
import { svgIcon } from './components/svg-icon';
import { skeleton } from './components/skeleton';
import { progress } from './components/progress';
import { checkbox } from './components/checkbox';
import { textField } from './components/textfield';
import { typography } from './components/typography';
import { breadcrumbs } from './components/breadcrumbs';
import { buttonGroup } from './components/button-group';
import { autocomplete } from './components/autocomplete';
import { loadingButton } from './components/loading-button';

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
  const components = merge(
    defaultProps(theme),
    //
    tabs(theme),
    menu(theme),
    list(theme),
    badge(theme),
    table(theme),
    paper(theme),
    alert(theme),
    button(theme),
    dialog(theme),
    appBar(theme),
    avatar(theme),
    tooltip(theme),
    popover(theme),
    svgIcon(theme),
    checkbox(theme),
    skeleton(theme),
    progress(theme),
    textField(theme),
    typography(theme),
    buttonGroup(theme),
    breadcrumbs(theme),
    autocomplete(theme),
    loadingButton(theme)
  );

  return components;
}
