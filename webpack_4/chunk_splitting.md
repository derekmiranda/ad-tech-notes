# Webpack 4 Chunk Splitting

[source](https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366)

## Previously on Webpack 3...
- chunks only had parent-child relationships
- however, that made it difficult to connect a Commons chunk with shared modules into the chunk graph

## NOW...
- chunk graph uses new object: ChunkGroup, which contains Chunks
- at entrypoint/async splitpoint, single ChunkGroup is referenced, which contains all Chunks
- Chunks can be reference in multiple ChunkGroups
- no longer any parent-child relationships b/w Chunk but now b/w ChunkGroups

## To note
- shared chunk generation will happen automatically happen when external library is bigger than 30kb
  - doesn't want to create extra request for <30 kb lib

