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
      color: 'text-white',
      background: 'bg-primary',
    },
    [ThemeType.Outline]: {
      color: 'text-primary',
      background: 'bg-white',
      border: 'border-primary',
    },
    [ThemeType.Hover]: {
      color: 'text-primary hover:text-white',
      background: 'bg-white hover:bg-primary',
    },
  },
  [ThemeEnum.Secondary]: {
    [ThemeType.Fill]: {
      color: 'text-white',
      background: 'bg-secondary',
    },
    [ThemeType.Outline]: {
      color: 'text-secondary',
      background: 'bg-white',
      border: 'border-secondary',
    },
    [ThemeType.Hover]: {
      color: 'text-secondary hover:text-white',
      background: 'bg-white hover:bg-secondary',
    },
  },
  [ThemeEnum.Success]: {
    [ThemeType.Fill]: {
      color: 'text-white',
      background: 'bg-success',
      border: 'border-success',
    },
    [ThemeType.Outline]: {
      color: 'text-success',
      background: 'bg-transparent',
      border: 'border-success',
    },
    [ThemeType.Hover]: {
      color: 'text-success hover:text-white',
      background: 'bg-transparent hover:bg-success',
    },
  },
  [ThemeEnum.Danger]: {
    [ThemeType.Fill]: {
      color: 'text-white',
      background: 'bg-danger',
      border: 'border-danger',
    },
    [ThemeType.Outline]: {
      color: 'text-danger',
      background: 'bg-transparent',
      border: 'border-danger',
    },
    [ThemeType.Hover]: {
      color: 'text-danger hover:text-white',
      background: 'bg-transparent hover:bg-danger',
    },
  },
  [ThemeEnum.Warning]: {
    [ThemeType.Fill]: {
      color: 'text-white',
      background: 'bg-warning',
      border: 'border-warning',
    },
    [ThemeType.Outline]: {
      color: 'text-warning',
      background: 'bg-transparent',
      border: 'border-warning',
    },
    [ThemeType.Hover]: {
      color: 'text-warning hover:text-white',
      background: 'bg-transparent hover:bg-warning',
    },
  },
  [ThemeEnum.Info]: {
    [ThemeType.Fill]: {
      color: 'text-white',
      background: 'bg-info',
      border: 'border-info',
    },
    [ThemeType.Outline]: {
      color: 'text-info',
      background: 'bg-transparent',
      border: 'border-info',
    },
    [ThemeType.Hover]: {
      color: 'text-info hover:text-white',
      background: 'bg-transparent hover:bg-info',
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
      color: 'text-dark hover:text-light',
      background: 'bg-light hover:bg-muted',
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
      color: 'text-dark hover:text-light',
      background: 'bg-light hover:bg-dark',
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
  },
};
