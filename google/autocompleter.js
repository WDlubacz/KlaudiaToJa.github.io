Vue.component("v-autocompleter", {
    data: function () {
      return {
        count: 0,
        isActive: 0,
        kontrol: 0,
        autocompleterIsActive: false,
        activeResult: 0,
        cities: window.cities.map((cityData) => {
        cityData.nameLowerCase = cityData.name.toLowerCase()}),
        filteredCities: []
      };
    },






    watch: 
    {
      googleSearch() {
        if (this.autocompleterIsActive) {
            return;
        }
        if (this.value.length === 0) {
            filteredCities = [];
            return;
        }
        let returnedCities = [];
        let searchLowerCase = this.googleSearch.toLowerCase();

        this.cities.forEach((cityData) => {
            if (returnedCities.length === 10 || !cityData.nameLowerCase.includes(searchLowerCase)) {
                return;
            }
            returnedCities.push({
                name: cityData.name,
                nameHtml: cityData.nameLowerCase.replace(searchLowerCase, (match) => {
                    return '<span class="bold">' + match + '</span>';
                })
            })
        });
        
        this.filteredCities = returnedCities;
      }
    },





    methods:
    {

      zmiana: function(a)
      {
        if(this.isActive == 0)
        {
          this.isActive = 1;
          this.googleSearch = a;
          el2 = document.getElementById("autocom");
          this.kontrol = 0;
        }
      },

      ustaw: function()
      {
        this.kontrol = 1;
      },

      strzalka: function(index)
      {
        if (!this.autocompleterIsActive) {
          index = 0;
        } 

        if (index > this.filteredCities.length - 1) {
            index = 0;
        } else if (index < 0) {
            index = this.filteredCities.length - 1;
        }
        
        this.autocompleterIsActive = true;
        this.activeResult = index;
        this.googleSearch = this.filteredCities[index].name;
      }
    },




    props: {
      value: {
        type: String,
        default: ""
      }
    },




    template: `
    <div>
        <a>googleSearch: {{ googleSearch }}</a>
        <a>kontrol: {{ kontrol }}</a>
        <a>miasta: {{ filteredCities.length }}</a>
        <a>auto: {{ autocompleterIsActive }}</a>
        
        <input 
            class="inp" 
            v-model="googleSearch" 
            type="search" 
            maxlength="2048" 
            title="Szukaj" 
            v-on:click="ustaw()" 
            @keyup.up="strzalka(activeResult - 1)" 
            @keyup.down="strzalka(activeResult + 1)" 
            @keyup.enter="zmiana(googleSearch)"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @keyup.enter="$emit('enter')">

            <div class="auto">         
                <div id="autocom" :class="[ value.length != 0 && filteredCities.length != 0 && kontrol == 1 ? 'autocompleter' : 'bez']">
                    <ul class="resultsBox">
                        <li class="pojedynczy" v-for="(city, index) in filteredCities" @click="zmiana(city.name)" :class="{active : autocompleterIsActive && activeResult === index}">
                            <img class="lupaAuto" src="lupa.png">
                            <div class="pojWyn" v-html="city">
                            </div>  
                        </li>
                    </ul>
                </div>
            </div>


    </div>    
    `
  });




  
  var app = new Vue({
    el: "#app",
    data: {
      enterClicked: 0,
      googleSearch: ""
    }
  });