<template>
    <div class="bar-wrapper">
    </div>
</template>
<script>
import * as d3 from 'd3';
export default {
    name: 'barChart',
    props: {
        data: {
            type:Array,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
            required:true,
        },
        height: {
            type: Number,
            required:true,
        },
        yLabel: {
            type: String,
            required:false,
        },
        xLabel: {
            type: String,
            required:false,
        }
    },
    data() {
        const dimensions = {
            width: this.width,
            height: this.height,
            margin: {
                top: 30,
                right: 10,
                bottom: 50,
                left: 50,
            },
        }
        dimensions.boundedWidth = this.width - dimensions.margin.left - dimensions.margin.right
        dimensions.boundedHeight = this.height - dimensions.margin.top - dimensions.margin.bottom
        return {
            dimensions,
            wrapper: null,
            bounds: null,
            xScale: null,
            yScale: null,
            colorScale: null,
            bins: null,
            binGroups: null,
        }
    },
    mounted() {
        this.init();
        this.scale();
        this.draw();
        this.drawAxis();
    },
    computed: {
    },
    methods: {
        fieldAccessor(d){
            return d[this.field];
        },
        yAccessor(d) {
            return d.length
        },
        init() {
            // canvas initialization
            this.wrapper = d3.select('.bar-wrapper')
                .append('svg')
                .attr("width", this.dimensions.width)
                .attr("height", this.dimensions.height);
            this.bounds = this.wrapper.append("g")
                .style("transform", `translate(${this.dimensions.margin.left}px, ${this.dimensions.margin.top}px`)

            // object initialization
            // this.binGroups = this.bounds.selectAll("g")
        },
        scale() {
            //scale x
            this.xScale =d3.scaleLinear().domain(d3.extent(this.data, this.fieldAccessor)).range([0,this.dimensions.boundedWidth]).nice()

            this.createBins()

            // scale y
            this.yScale = d3.scaleLinear().domain([0,d3.max(this.bins, this.yAccessor)]).range([this.dimensions.boundedHeight, 0])

            // this.yScale =d3.scaleLinear().domain(d3.extent(this.data, this.yAccessor)).range([this.dimensions.boundedHeight, 0]).nice()
            // this.colorScale = d3.scaleLinear().domain(d3.extent(this.data, this.colorAccessor)).range(["skyblue","darkslategrey"])
        },
        createBins() {
            const binsGenerator = d3.histogram().domain(d3.extent(this.data, this.fieldAccessor)).value(this.fieldAccessor).thresholds(d3.max(this.data, this.fieldAccessor) + 1)
            this.bins = binsGenerator(this.data)
        },
        draw() {
            this.binGroups = this.bounds.selectAll("g").data(this.bins);
            // this.binGroups.html("")
            //this.binGroups = this.bounds.selectAll("g")
            // const rects = this.binGroups.data(this.bins);
            // .join("g")
            // .attr('class','bars')
            this.binGroups.exit().remove()
            const newBinGroups = this.binGroups.enter().append("g").attr('class', 'bin');
            newBinGroups.append("rect")
            newBinGroups.append("text")
            this.binGroups = newBinGroups.merge(this.binGroups)

            const barPadding = 2;
            //rects.append("rect")
            this.binGroups.select("rect")
                .attr("x", d => this.xScale(d.x0) + barPadding/2)
                .attr("y", d => this.yScale(this.yAccessor(d)))
                .attr("width", d =>  d3.max([0, this.xScale(d.x1) - this.xScale(d.x0) - barPadding]))
                .attr("height", d => d3.max([0, this.dimensions.boundedHeight - this.yScale(this.yAccessor(d))]))
                .attr("fill", "cornflowerblue")

            // const barText = rects.filter(this.yAccessor)
            this.binGroups.select("text")
                .attr("x", d => this.xScale(d.x0) + (this.xScale(d.x1) - this.xScale(d.x0)) / 2)
                .attr("y", d => this.yScale(this.yAccessor(d)) - 5)
                .text(this.yAccessor)
                .style("text-anchor", "middle")
                .attr("fill", "darkgrey")
                .style("font-size", "12px")
                .style("font-family", "sans-serif")
        },
        drawAxis() {
            const xAxisGenerator = d3.axisBottom().scale(this.xScale).ticks(d3.max(this.data, this.fieldAccessor))
            const xAxis = this.bounds.append("g")
                .call(xAxisGenerator)
                .style("transform", `translateY(${this.dimensions.boundedHeight}px)`)
            xAxis.append("text")
                .attr("x", this.dimensions.boundedWidth / 2)
                .attr("y", this.dimensions.margin.bottom - 10)
                .attr("fill", "black")
                .style("font-size", "1.4em")
                .text(this.yLabel ? this.yLabel : this.field)
                .style("text-transform", "capitalize")
        }
    },
    watch: {
        field(){
            this.scale();
            this.draw()
        },
        data() {
            this.scale();
            this.draw()
            this.drawAxis()
        }
    }
}
</script>
<style lang="sass">
.bin
    rect
        transition: all 0.4s ease-out
        &:hover
            fill: orange
            cursor: pointer
</style>
