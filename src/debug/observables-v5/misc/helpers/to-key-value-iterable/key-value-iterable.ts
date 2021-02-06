
export type IKeyValueTuple<GKey, GValue> = [key: GKey, value: GValue];

export type IKeyValueIterable<GKey, GValue> = Iterable<IKeyValueTuple<GKey, GValue>>;


export type IKeyValueIterableLike<GKey, GValue> = object | IKeyValueIterable<GKey, GValue>;
