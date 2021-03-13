# petit

## TODO

* sequence frame.frame should be reference
* sequence "animate" boolean
* sequence framerate
* buttons with icons for "add new *"
* update color select to use dropdown (block/node/palette/color/select)
* tree filter by type
* tree search
* move selection to project
* node.selection.{selected,child,group}
* identifier save needs optionally update usages
* provide project as node.project instead of nodes
* sprite select, move parts of pixels
* color picker
* node.selected → new Select(node); also expanded-selcted handling

## DONE

* Sprite could have nested `sprite/frames` node
* Select palette for each sprite.
* Frame fill
* Frame dimensions from sprite
* Color palettes limited to 255 colors + transparent.
* Sprite timeline
* tree should show nested selection when not expanded
* palette alpha 0..255
* slider input
* color sliders
* sprite colors toolbar
* Sprite dimensions from doc. Defaults to 16x16px
* Add "show" in references inspector block
* Project pixel, node.pixel
* Toolbar tools for sprite resize, select, copy-paste
* resize sprites
* draggable project editor
* Sidebar tabs -- inspector, "color". instead of selected color stuff in palette
* color.warnings, ui
* color dropdown filter colors with identifiers
* scene.color missing reference
* color mapping to color identifiers for sprites
* missing colors in sprite.colors warning
* remove unused colors from sprite.colors
* overall selection borders
* sequence missing sprite warning
* frame missing frame warning (if sprite exists)
* refactor palette to synthetic nodes
* sequence frame should have frame property instead of identifier
* use property/select for sprite
* sequence timeline
* save selection also for doc-node
* dropdown with any content
* reference inspector use custom dropdown
* sequence inspector: frame selection dropdown
