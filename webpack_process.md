# Seal step

This creates the Chunks, adds Modules to Chunks, assigns ids to Modules and Chunks, runs optimization plugins, and sets up assets that will be written to the file system

1. from array of `preparedChunks`, Chunk objects are created. They're given entry module for chunk then call `processDependenciesBlocksForChunk` to determine what other modules should be included in Chunk and add them to it
	- creates Chunk graph from initial Module graph

# So...

How can I work with the Module graph such that I can __include `ad-load`__ while __keeping it out of the non-ad-load chunks__?