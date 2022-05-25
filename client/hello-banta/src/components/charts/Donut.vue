<template>
    <div class="donus-chart">
    </div>
</template>
<script>
import * as d3 from 'd3';

export default {
    name: 'DonutChart',
    mounted() {
        this.buildChart();        
        console.log(d3)
    },
    props:{
        data: {
            type: Array,
            required: true,
        },
        name:{
            type: String,
            required: true,
        }
    },
    data () {
        const dimensions = {
            width: 280,
            height: 280,
            thickness: 50,
        };
        const radius = Math.min(dimensions.width, dimensions.height)/2
        const color = d3.scaleOrdinal(d3.schemePaired);
        return {
            dimensions, 
            radius,
            color,
        }
    },
    methods: {
        buildChart(){
            const svg = d3.select(".donus-chart")
                .append('svg')
                .attr('class', 'pie')
                .attr('width', this.dimensions.width)
                .attr('height', this.dimensions.height);
            const g = svg.append('g')
                .attr('transform', `translate(${this.dimensions.width/2},${this.dimensions.height/2})`);
            const arc = d3.arc()
                .innerRadius(this.radius - this.dimensions.thickness)
                .outerRadius(this.radius);
            const pie = d3.pie()
                .value(function(d) { return d.value; })
                .sort(null);
            const g2 = g.selectAll('g')
                .data(pie(this.data))
                .enter()
                .append("g");
            g2.append('path')
                .attr('d', arc)
                .attr('fill', (d,i) => this.color(i));
            g2.append('text').attr("transform", function(d) {
                let _d = arc.centroid(d);
                return "translate(" + _d + ")";
            })
                .attr("dy", ".50em")
                .style("text-anchor", "middle")
                .style("font-size", "0.8rem")
                .attr('fill', '#222')
                .text(function(d) {
                    return d.data.percentage + '%';
                })

            g2.append('text').attr("transform", function(d) {
                let _d = arc.centroid(d);
                return "translate(" + _d + ")";
            })
                .attr('class', 'uk-text-lowercase')
                .attr("dy", "-0.50em")
                .style("text-anchor", "middle")
                .style("font-size", "0.9rem")
                .attr('fill', '#333')
                .text(function(d) {
                    return d.data.name;
                })
            const text_group = g2
                .style("fill", "black")
                .append("g")
                .attr("class", "text-group");
    
            text_group.append("text")
                .attr("class", "name-text")
                .text('RESULTS')
                .attr('fill', 'grey')
                .style("font-size", "1.3em")
                .attr('text-anchor', 'middle')
                .attr('dy', '-0.5em');

            text_group.append("text")
                .attr("class", "name-text")
                .text(this.name)
                .attr('fill', '#ccc')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.5em');
        }
    },
    watch: {
        data() {
            d3.select(".donus-chart").html("")
            this.buildChart();
        }
    }
}
</script>