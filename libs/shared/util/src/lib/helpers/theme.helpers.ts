export class ThemeHelpers {
  static getThemeClasses(
    theme: keyof typeof ThemeEnum,
    themeType: keyof typeof ThemeType
  ): string {
    const _theme = ThemeEnum[theme];
    const _themeType = ThemeType[themeType];

    const { color, background, border } = ThemeOptionsEnum[_theme][_themeType];

    const borderClass = border ? `${border} border-1` : 'border-transparant';

    return `${color} ${background} ${borderClass}`;
  }
}

export enum ThemeType {
  Fill = 'fill',
  Outline = 'outline',
  Hover = 'hover',
  TextOnly = 'text-only',
}

export enum ThemeEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
  Muted = 'muted',
}

const ThemeOptionsEnum: {
  [key in ThemeEnum]: {
    [key in ThemeType]: {
      color: string;
      background: string;
      border?: string;
    };
  };
} = {
  [ThemeEnum.Primary]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-primary',
    },
    [ThemeType.Outline]: {
      color: 'text-primary',
      background: 'bg-light dark:bg-dark',
      border: 'border-primary',
    },
    [ThemeType.Hover]: {
      color: 'text-primary hover:text-light',
      background: 'bg-light hover:bg-primary',
    },
    [ThemeType.TextOnly]: {
      color: 'text-primary',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Secondary]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-secondary',
    },
    [ThemeType.Outline]: {
      color: 'text-secondary',
      background: 'bg-light',
      border: 'border-secondary',
    },
    [ThemeType.Hover]: {
      color: 'text-secondary hover:text-light',
      background: 'bg-light hover:bg-secondary',
    },
    [ThemeType.TextOnly]: {
      color: 'text-secondary',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Success]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-success',
      border: 'border-success',
    },
    [ThemeType.Outline]: {
      color: 'text-success',
      background: 'bg-transparent',
      border: 'border-success',
    },
    [ThemeType.Hover]: {
      color: 'text-success hover:text-light',
      background: 'bg-transparent hover:bg-success',
    },
    [ThemeType.TextOnly]: {
      color: 'text-success',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Danger]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-danger',
      border: 'border-danger',
    },
    [ThemeType.Outline]: {
      color: 'text-danger',
      background: 'bg-transparent',
      border: 'border-danger',
    },
    [ThemeType.Hover]: {
      color: 'text-danger hover:text-light',
      background: 'bg-transparent hover:bg-danger',
    },
    [ThemeType.TextOnly]: {
      color: 'text-danger',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Warning]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-warning',
      border: 'border-warning',
    },
    [ThemeType.Outline]: {
      color: 'text-warning',
      background: 'bg-transparent',
      border: 'border-warning',
    },
    [ThemeType.Hover]: {
      color: 'text-warning hover:text-light',
      background: 'bg-transparent hover:bg-warning',
    },
    [ThemeType.TextOnly]: {
      color: 'text-warning',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Info]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-info',
      border: 'border-info',
    },
    [ThemeType.Outline]: {
      color: 'text-info',
      background: 'bg-transparent',
      border: 'border-info',
    },
    [ThemeType.Hover]: {
      color: 'text-info hover:text-light',
      background: 'bg-transparent hover:bg-info',
    },
    [ThemeType.TextOnly]: {
      color: 'text-info',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Light]: {
    [ThemeType.Fill]: {
      color: 'text-dark',
      background: 'bg-light',
      border: 'border-dark',
    },
    [ThemeType.Outline]: {
      color: 'text-dark',
      background: 'bg-light',
      border: 'border-muted',
    },
    [ThemeType.Hover]: {
      color: 'text-dark hover:text-light dark:text-light hover:dark:text-dark',
      background: 'bg-light hover:bg-muted',
    },
    [ThemeType.TextOnly]: {
      color: 'text-dark',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Dark]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-dark',
    },
    [ThemeType.Outline]: {
      color: 'text-dark',
      background: 'bg-light',
      border: 'border-dark',
    },
    [ThemeType.Hover]: {
      color: 'text-dark hover:text-light dark:text-light hover:dark:text-dark',
      background: 'bg-light hover:bg-dark dark:bg-dark hover:dark:bg-muted',
    },
    [ThemeType.TextOnly]: {
      color: 'text-dark',
      background: 'bg-transparent',
    },
  },
  [ThemeEnum.Muted]: {
    [ThemeType.Fill]: {
      color: 'text-light',
      background: 'bg-muted',
    },
    [ThemeType.Outline]: {
      color: 'text-grey',
      background: 'bg-transparent',
      border: 'border-muted',
    },
    [ThemeType.Hover]: {
      color: 'text-grey hover:text-light',
      background: 'bg-transparent hover:bg-muted',
    },
    [ThemeType.TextOnly]: {
      color: 'text-grey',
      background: 'bg-transparent',
    },
  },
};
