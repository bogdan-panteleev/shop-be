export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

export function pathUp(path: string, level: number): string {
  return path.split('/').slice(0, -level).join('/');
}
