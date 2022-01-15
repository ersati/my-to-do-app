SIMPLE STRUCTURE
The simple structure is convenient for a small project like a single web page. For that purpose, you need to create a very minimal structure. Here is an example:

\_base.sass — contains all the resets, variables, mixins, and utility classes
\_layout.sass — all the Sass code handling the layout, which is the container and grid systems
\_components.sass — everything that is reusable – buttons, navbars, cards, and so on
\_main.sass — the main partial should contain only the imports of the already mentioned files
Another example of the same simple structure is the following:

\_core.sass — contains variables, resets, mixins, and other similar styles
\_layout.sass — there are the styles for the header, footer, the grid system, etc
\_components.sass — styles for every component necessary for that project, including buttons, modals, etc.
\_app.sass — imports
This is the one I usually use for smaller projects. And when it comes to making a decision of what kind of structure to be used, the size of the project is often the deciding factor.
