# How does CommonsChunkPlugin work?

- Compiler: at "this-compilation"
  - Compilation: at "optimize-chunks"
    - creates list of "common" chunks
      - if chunk has name in chunkNames, put on list
      - if no chunk w/ name given in chunkNames, new chunk created and added to list
      - __these chunks are the targets for extracted modules__
    - *What does "optimizing" entail?*
