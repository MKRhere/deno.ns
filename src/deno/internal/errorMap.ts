import * as errors from "../stable/variables/errors.js";

type Class<T> = new (...params: unknown[]) => T;

type ClassOrT<T> = T extends Class<infer U> ? U : T;

const mapper = (Ctor: typeof errors[keyof typeof errors]) =>
  (err: Error) =>
    Object.assign(new Ctor(err.message), {
      stack: err.stack,
    }) as unknown as ClassOrT<typeof Ctor>;

const map: Record<string, ReturnType<typeof mapper>> = {
  EEXIST: mapper(errors.AlreadyExists),
  ENOENT: mapper(errors.NotFound),
};

const isNodeErr = (e: unknown): e is Error & { code: string } => {
  return e instanceof Error && "code" in e;
};

export default function mapError<E>(e: E) {
  if (!isNodeErr(e)) return e;
  return map[e.code]?.(e) || e;
}
