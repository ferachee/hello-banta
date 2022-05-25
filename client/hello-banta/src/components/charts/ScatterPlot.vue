<template>
    <div class="scatter-wrapper">
    </div>
</template>
<script>
import * as d3 from 'd3';
export default {
    name: 'scatterPlot',
    props: {
        data: {
            type:Array,
            required: true,
        },
        xField: {
            type: String,
            required: true,
        },
        yField: {
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
                top: 10,
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
            dots: null,
        }
    },
    mounted(){
        this.init();
        this.drawAxis();
        this.drawDots()
        // setTimeout(() => {
        //     this.drawDots(this.data.slice(100,130), 'green')
        // }, 3000);
    },
    computed: {
    },
    methods: {
        xAccessor(d){
            return d[this.xField]
        },
        yAccessor(d){
            return d[this.yField]
        },
        colorAccessor(d){
            return d[this.xField]
        },
        init() {

            // canvas initialization
            this.wrapper = d3.select('.scatter-wrapper')
                .append('svg')
                .attr("width", this.dimensions.width)
                .attr("height", this.dimensions.height);
            this.bounds = this.wrapper.append("g")
                .style("transform", `translate(${this.dimensions.margin.left}px, ${this.dimensions.margin.top}px`)

            // object initialization
            this.dots= this.bounds.selectAll("circle")

            this.scale()
        },
        scale() {
            //scaling
            this.xScale =d3.scaleLinear().domain(d3.extent(this.data, this.xAccessor)).range([0,this.dimensions.boundedWidth]).nice()
            this.yScale =d3.scaleLinear().domain(d3.extent(this.data, this.yAccessor)).range([this.dimensions.boundedHeight, 0]).nice()
            this.colorScale = d3.scaleLinear().domain(d3.extent(this.data, this.colorAccessor)).range(["skyblue","darkslategrey"])
        },
        drawDots() {
            this.dots.data(this.data)
            // dots.enter() // new data
            //     .append("circle") // only appends with new data
            //     .merge(dots) // update : appending with old existing data (removes old data that does not exist)
                .join("circle")
                // .join(
                //     enter => enter.append("circle").attr("fill", d => this.colorScale(this.colorAccessor(d))),
                //     update => update.attr("fill", "cadetblue"),
                // )
                .attr("cx", d => this.xScale(this.xAccessor(d)))
                .attr("cy", d => this.yScale(this.yAccessor(d)))
                .attr("r", 5)
                .attr("fill", d => this.colorScale(this.colorAccessor(d)))
        },
        drawAxis() {
            // should this be watched? I think  so cos if the data changes so should the axis;
            // scaling would also change; but dimensions and bounds probably not 

            // x axis creation
            const xAxisGenerator = d3.axisBottom().scale(this.xScale).ticks(d3.max(this.data, this.xAccessor));
            const xAxis = this.bounds.append("g")
                .call(xAxisGenerator)
                .style("transform", `translateY(${this.dimensions.boundedHeight}px`)

            // create y label
            xAxis.append('text')
                .attr("x", this.dimensions.boundedWidth / 2)
                .attr("y", this.dimensions.margin.bottom - 10)
                .attr("fill", "black")
                .style("font-size", "1.4em")
                .html(this.xLabel ? this.xLabel : this.xField)
            
            // y axis creation
            const yAxisGenerator = d3.axisLeft().scale(this.yScale).ticks(d3.max(this.data, this.yAccessor) );
            const yAxis = this.bounds.append("g")
                .call(yAxisGenerator)

            // create y label
            yAxis.append('text')
                .attr("x", - this.dimensions.boundedHeight / 2)
                .attr("y", - this.dimensions.margin.left + 10)
                .attr("fill", "black")
                .style("font-size", "1.4em")
                .text(this.yLabel ? this.yLabel : this.yField)
                .style("transform", "rotate(-90deg)")
                .style("text-anchor", "middle")
        }

    }
}
</script>
<style lang="sass"></style>
