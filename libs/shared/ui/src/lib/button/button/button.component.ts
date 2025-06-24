import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export enum ButtonTypeEnum {
  Fill = 'fill',
  Outline = 'outline',
}

export enum ThemeEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
}

const ThemeOptionsEnum: {
  [key in ThemeEnum]: {
    [key in ButtonTypeEnum]: {
      color: string;
      background: string;
      border?: string;
    };
  };
} = {
  [ThemeEnum.Primary]: {
    [ButtonTypeEnum.Fill]: {
      color: 'text-white',
      background: 'bg-primary',
    },
    [ButtonTypeEnum.Outline]: {
      color: 'text-primary',
      background: 'bg-white',
      border: 'border-primary',
    },
  },
  [ThemeEnum.Secondary]: {
    [ButtonTypeEnum.Fill]: {
      color: 'text-white',
      background: 'bg-secondary',
    },
    [ButtonTypeEnum.Outline]: {
      color: 'text-secondary',
      background: 'bg-white',
      border: 'border-secondary',
    },
  },
  [ThemeEnum.Success]: {
    [ButtonTypeEnum.Fill]: {
      color: 'text-white',
      background: 'bg-green-500',
      border: 'border-green-500',
    },
    [ButtonTypeEnum.Outline]: {
      color: 'text-gree',
      background: 'bg-transparent',
      border: 'border-green-500',
    },
  },
  [ThemeEnum.Danger]: {
    [ButtonTypeEnum.Fill]: {
      color: 'text-white',
      background: 'bg-red-500',
      border: 'border-red-500',
    },
    [ButtonTypeEnum.Outline]: {
      color: 'text-red-500',
      background: 'bg-transparent',
      border: 'border-red-500',
    },
  },
  [ThemeEnum.Warning]: {
    [ButtonTypeEnum.Fill]: {
      color: 'text-white',
      background: 'bg-yellow-500',
      border: 'border-yellow-500',
    },
    [ButtonTypeEnum.Outline]: {
      color: 'text-yellow-500',
      background: 'bg-transparent',
      border: 'border-yellow-500',
    },
  },
  [ThemeEnum.Info]: {
    [ButtonTypeEnum.Fill]: {
      color: 'text-white',
      background: 'bg-blue-500',
      border: 'border-blue-500',
    },
    [ButtonTypeEnum.Outline]: {
      color: 'text-blue-500',
      background: 'bg-transparent',
      border: 'border-blue-500',
    },
  },
};

@Component({
  selector: 'mwc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule],
})
export class ButtonComponent {
  type = input<HTMLButtonElement['type']>('button');
  themeType = input<keyof typeof ButtonTypeEnum>('Fill');
  theme = input<keyof typeof ThemeEnum>('Primary');
  buttonClasses = input<string>('');

  themeClasses = computed(() => {
    const { color, background, border } =
      ThemeOptionsEnum[ThemeEnum[this.theme()]][
        ButtonTypeEnum[this.themeType()]
      ];

    const borderClass = border ? `${border} border-1` : 'border-transparant';

    return `${color} ${background} ${borderClass}`;
  });
}
