<template>
  <div>
    <div class="toolbox">
      <button @click="updateFirstRow">Update first row</button>
      <button @click="changeZoomLevel">Change zoom level</button>
    </div>
    <div class="gstc-wrapper" ref="gstc"></div>
  </div>
</template>

<script>
import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";
import { Plugin as Bookmarks } from "gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js";
import "gantt-schedule-timeline-calendar/dist/style.css";

let gstc, state;

// helper functions

function generateRows() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows = {};
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    rows[id] = {
      id,
      label: `Row ${i}`,
    };
  }
  return rows;
}

function generateItems() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  let start = GSTC.api.date().startOf("day").subtract(6, "day");
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString());
    start = start.add(1, "day");
    items[id] = {
      id,
      label: `Item ${i}`,
      rowId,
      time: {
        start: start.valueOf(),
        end: start.add(1, "day").endOf("day").valueOf(),
      },
    };
  }
  return items;
}

// main component

export default {
  name: "GSTC",
  mounted() {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Config }
     */
    const config = {
      licenseKey:
        "====BEGIN LICENSE KEY====\nRc0IQIMxlnbzcBOMeczwAM+k5AVWNIsEfHa7PYiySq7IReACgB0T7AfWYK9broDExRM7RLVdZd5RZy+4UM5aENRFxSKKGhxr3eZEd5ewKhC7167P90DYt7LtjwSumZJvOdF9SFaZDR7Zk8jOjo6V/NWxc7pWKQa60qzVT6jLnWcF0OguPx5afSlAHhrVzsaLiJ5wFJY+XmtZv1F8/fNNHMs0GLK45mz12oVqhr4R+5Sx5rotX8QZe4gjwxS8Z2d+uAbnSvStwxnyMa8OBAeiViGABYukbYz+bBGzL6E0fkZlcrYY7KMPnkcRYiatUqWi9tjDwWoBxArC9FJoYvWosA==||U2FsdGVkX1/8lQBd2/7qXzmIRS7s4ApjWGAEv08sRtAf3P5ocswNAPFo7WZfj/Anx7VfH6eEUt7vQj/ahBeLG94HV3c27oH8FVbx11NLLAM=\nbj9PfKKzPu5XscgbNZTW0Hntj78/+GkAydEkGmKqAeeiethLOmqmGk7/Jbpia1xljUuFkc7/Mw3GsJCEXRwWT40TAOZi2n0nZy0kxVs4VfMEz71fixCkY4qYm99SsIv2fgp88aRObrwdTN/uUz1f3NZN4Muh7Ywy8WNhRsU6G9H6pY6VWO4jH6ueYlgNHcW1bovk83USW97+E+K2wfv9f6NahUUllIbPyJHxajofuD/o6Y/2qIs4OS4ALujTMw05BHvi8/AVI/de2VyeYq6EXomw1+8EWsmC9c3MGbOcdlCpumIAuLQPtHUzvoVhKH6ddfveVzkpcQanSgPsmJACLg==\n====END LICENSE KEY====",
      plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement(), Bookmarks()],
      list: {
        columns: {
          data: {
            [GSTC.api.GSTCID("id")]: {
              id: GSTC.api.GSTCID("id"),
              width: 60,
              data: ({ row }) => GSTC.api.sourceID(row.id),
              header: {
                content: "ID",
              },
            },
            [GSTC.api.GSTCID("label")]: {
              id: GSTC.api.GSTCID("label"),
              width: 200,
              data: "label",
              header: {
                content: "Label",
              },
            },
          },
        },
        rows: generateRows(),
      },
      chart: {
        items: generateItems(),
      },
    };

    state = GSTC.api.stateFromConfig(config);

    gstc = GSTC({
      element: this.$refs.gstc,
      state,
    });
  },

  beforeUnmount() {
    if (gstc) gstc.destroy();
  },

  methods: {
    updateFirstRow() {
      state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row) => {
        row.label = "Changed dynamically";
        return row;
      });
    },

    changeZoomLevel() {
      state.update("config.chart.time.zoom", 21);
    },
  },
};
</script>
<style scoped>
.gstc-component {
  margin: 0;
  padding: 0;
}
.toolbox {
  padding: 10px;
}
</style>