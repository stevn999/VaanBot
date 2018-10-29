#Vaanbot
------------
##### What is Vaanbot?
- Vaanbot at it&apos;s core is a twitch.tv to MineCraft integration.
- It was written with the [TMI](https://docs.tmijs.org/ "TMI") and [MineFlayer](https://github.com/PrismarineJS/mineflayer "MineFlayer") by Steven_VaanULTRA

##### Why make Vaanbot?
- I wanted to recreate an experience [SethBling](https://www.twitch.tv/sethbling "SethBling") created with a huge amount of people doing basically the same thing.
- I wanted to let my viewers have some fun and give them the ability to directly interact with the world I was playing in.

##### Is it okay to troll, and try to kill you?
- It&apos;s fine, but I wont make it easy. I&apos;ve blacklisted some blocks and the ability to place blocks inside my head. So instant damage is out of the question. You can still suffocate me, take the floor out from under me and bury my in obsidian.

------------

#  Commands

As of right now, there is one command.

##  !mcp
!mcp [block] [x] [y] [z] [dv]

| Component  | Use  | Example  |
| :------------ | :------------ | :------------ |
| Block  | the type of [block](https://minecraft.gamepedia.com/Java_Edition_data_values/Block_IDs "block") to put in the world | stone, tnt, anvil  | 
| x, y, z  | the [coordinates](https://minecraft.gamepedia.com/Coordinates "coordinates") to put the block. Defaults to `0 2 0` | 0 200 0, 0 -1 0, ~250 ~64 ~232  |
| dv or[ **data value**](https://minecraft.gamepedia.com/Java_Edition_data_values#Blocks " **data value**") |If there is a rotation, different type, or state of the block being placed. This controls that data| 0, 1, 2

### Common uses
| Command  | Effect  |
| :------------ | :------------ |
| `!mcp anvil 0 20 0` | Places and anvil 20 meters above my head to do damage|
| `!mcp cobweb f2` | Places a web 2 meters in the direction I'm looking|
|  `!mcp air 0 -1 0` | Removes the block I&apos;m standing on  |
| `!mcp tnt ~230 ~68 ~218`  | Places tnt in the world coordinates 230 68 218 instead of relative to my own position 
*Using a mixture of absolute and relative coordinates may not work as intended.*  
### Other notes
- You are unable to place at 0 1 0 because of abuse in the past of people relentlessly killing me with nothing I could do
- The banned blocks are **bedrock, flowing_water, water, lava, flowing_lava, end_portal, fire, barrier, structure_block, repeating_command_block, chain_command_block, structure_void, mob_spawner, command_block**

