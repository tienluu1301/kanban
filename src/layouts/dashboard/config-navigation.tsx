import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  kanban: icon('ic_kanban'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = [
    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      items: [
        // KANBAN
        {
          title: 'Kanban',
          path: paths.dashboard.kanban,
          icon: ICONS.kanban,
        },
      ],
    },
  ];

  return data;
}
