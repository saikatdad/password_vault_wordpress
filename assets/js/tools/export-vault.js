jQuery('#exportButton').click(function () {
      jQuery.ajax({
        url: window.fp_plugin_data.ajax_url,
        type: "POST",
        dataType: "json",
        data: {
        action: "fp_export_vault",
        },
        success: function(response) {
          const header = Object.keys(response[0]).join(",");
          const data = response.map(obj => {
              return Object.values(obj).map(val => {
              if (typeof val === "string") {
                  return `"${val.replace(/"/g, '""')}"`;
              }
              return val;
              }).join(",");
          }).join("\n");

                          
          const blob = new Blob([`${header}\n${data}`], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", "data.csv");
          link.click();
        },
        error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        }
    });

  });

