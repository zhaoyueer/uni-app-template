import { createDecorator } from 'vue-class-component';

export const Options = (params: unknown): ClassDecorator => {
  return createDecorator((options) => {
    Object.assign(options, { options: params });
  });
};
